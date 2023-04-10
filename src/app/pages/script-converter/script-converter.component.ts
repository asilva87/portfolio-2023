import { Component } from '@angular/core';
import { dictionary } from 'cmu-pronouncing-dictionary'
import latCyr from './util/lat-cyr'; // Dictionary from ARPABET's phonemes to my own approximation in Russian cyrillic.

@Component({
  selector: 'app-script-converter',
  templateUrl: './script-converter.component.html',
  styleUrls: ['./script-converter.component.scss']
})
export class ScriptConverterComponent {
  // Text from user input
  public inputText = ''
  // Converted words from input
  public convertedWords: Record<string, string | boolean>[] = []

  constructor() {}

  public convertText(inputText: string) {
    // Used to force the translation of the previous word before having to start typing the next.
    // Done before trimming as to not miss it.
    const lastCharWasSpace = inputText[inputText.length - 1] === ' '
    // String input turned into an array, after remove stress numbers and trimming.
    let inputTextArr: string[] = inputText.trim().replace(/\s+/g, ' ').split(' ')

    if (inputTextArr) {
      for (let i = 0; i < inputTextArr.length; i++) {
        // If the converted words array is longer than the input, it means a word has been removed
        // from the input and should therefore have its conversion removed.
        if (this.convertedWords.length > inputTextArr.length) {
          this.convertedWords.pop()
        }

        // Space triggers the conversion.
        // English words that have been found in the dictionary have their conversions to ARPABET
        // already in the dictionary. This conversion is then converted again into Russia cyrillic
        // letters.
        // Words successfully converted receive a tag "isWrong === false", because words that haven't
        // been found are specially marked in the template.
        if (lastCharWasSpace && dictionary[inputTextArr[i]]) {
          this.convertedWords[i] = {
            word: this.getCyrillicConversion(dictionary[inputTextArr[i]].replace(/[0-9]/g, '')),
            isWrong: false
          }
        }

        // If word hasn't been found, then push it to the array of converted words anyway, but mark
        // it was a wrong word, so that it can't been displayed differently in the template.
        if (!dictionary[inputTextArr[i]]) {
          this.convertedWords[i] = { word: inputTextArr[i], isWrong: true}
        }
      }
    }
  }

  private getCyrillicConversion(arpabetWord: string): string {
    // Since the ARPABET word conversion in the dictionary is written with each phoneme separated by
    // a space (a requirement of ARPABET), split this string into an array for easier use.
    let arpabetWordArr: string[] = arpabetWord.split(' ')
    let wordInCyrillic = ''

    // For each ARPABET letter/letters, convert it to my own interpretation of these sounds using the
    // Russian cyrillic alphabet.
    for (let letter of arpabetWordArr) {
      wordInCyrillic += latCyr[letter]
    }

    return wordInCyrillic
  }
}
