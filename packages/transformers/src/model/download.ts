import os from 'node:os'
import { resolve } from 'node:path'
import fs from 'node:fs/promises'
import { AutoProcessor, AutoTokenizer, PreTrainedModel, PreTrainedTokenizer, Processor, type PretrainedModelOptions } from '@huggingface/transformers'
import { SUPPORTED_TASKS } from './tasks'
import type { SUPPORTED_TASKS_TYPES } from './tasks'
import defu from 'defu'

export function useDownloadModels() {
  const HOME_DIR_PATH = resolve(os.homedir(), '.transformers')
  const LOCAL_MODEL_PATH = `${HOME_DIR_PATH}/models`

  async function download(task: SUPPORTED_TASKS_TYPES, repo: string, opts: PretrainedModelOptions = {}) {
    await fs.mkdir(LOCAL_MODEL_PATH, { recursive: true })

    const options = defu(opts, {
      cache_dir: LOCAL_MODEL_PATH
    })

    const promises: Promise<PreTrainedTokenizer | PreTrainedModel | Processor>[] = []

    if ('tokenizer' in SUPPORTED_TASKS[task]) {
      promises.push((SUPPORTED_TASKS[task].tokenizer as typeof AutoTokenizer).from_pretrained(repo, options))
    }

    if ('processor' in SUPPORTED_TASKS[task]) {
      if (SUPPORTED_TASKS[task].processor instanceof Array) {
        for (const processor of (SUPPORTED_TASKS[task].processor as Array<typeof AutoProcessor | null>)) {
          if (processor) {
            promises.push(processor.from_pretrained(repo, options))
          }
        }
      } else {
        promises.push((SUPPORTED_TASKS[task].processor as typeof AutoProcessor).from_pretrained(repo, options))
      }
    }

    if (SUPPORTED_TASKS[task].model instanceof Array) {
      for (const model of SUPPORTED_TASKS[task].model) {
        promises.push(model.from_pretrained(repo, options))
      }
    } else {
      promises.push(SUPPORTED_TASKS[task].model.from_pretrained(repo, options))
    }

    await Promise.all(promises)
  }
  return {
    download
  }
}