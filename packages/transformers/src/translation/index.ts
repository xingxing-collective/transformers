import { pipeline } from "@huggingface/transformers"
import type {
  PretrainedModelOptions,
  TextGenerationConfig,
  TranslationOutput,
  TranslationPipeline
} from "@huggingface/transformers"
import { TranslationLanguages } from "./languages"

export namespace Translation {

  /**
   * This class uses the Singleton pattern to ensure that only one instance of the
   * pipeline is loaded. This is because loading the pipeline is an expensive
   * operation and we don't want to do it every time we want to translate a sentence.
   */
  export class Translation {
    static model = "Xenova/nllb-200-distilled-600M";
    static options: PretrainedModelOptions = {
      dtype: 'q8'
    }
    static instance: Promise<TranslationPipeline> | null = null;

    static async getInstance(model?: string, options?: PretrainedModelOptions) {
      return this.instance ??= pipeline<'translation'>('translation', model ?? this.model, options ?? this.options)
    }
  }

  export interface TranslationConfig extends Partial<TextGenerationConfig> {
    src_lang?: TranslationLanguages.LanguageCode
    tgt_lang?: TranslationLanguages.LanguageCode
  }

  export async function translator(texts: string | string[], config?: TranslationConfig): Promise<TranslationOutput | TranslationOutput[]> {
    const pipeline = await Translation.getInstance();
    // @ts-ignore
    return pipeline(texts, config);
  }
}
