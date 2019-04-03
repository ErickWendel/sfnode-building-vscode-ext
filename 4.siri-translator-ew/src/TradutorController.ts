import { Disposable, window } from 'vscode';
const KEY = 'c53fecda0c2843fcb28784d68e7928fa';

const Translator = require('mstranslator');
const client = new Translator(
  {
    api_key: KEY,
  },
  true,
);

const sleep = ms => new Promise(r => setTimeout(r, ms * 1000));
const speak = async (text, voice) => {
  const Say = require('say');
  Say.speak(text, voice)
  await sleep(text.length / 10); 
  return 

}

const translate = params =>
  new Promise((resolve, reject) =>
    client.translate(params, (error: string, data: string) =>
      error ? reject(error as string) : resolve(data as string),
    ),
  );

export default class TradutorController {
  private _disposable: Disposable;
  private lastSelection: Date = new Date();
  private text: string = '';
  constructor() {
    let subscriptions: Disposable[] = [];
    window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
    this._verifySelection();
  }

  public dispose() {
    this._disposable.dispose();
  }

  private async _onEvent() {
    const editor = window.activeTextEditor;
    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    if (selectedText === '') {
      return;
    }
    this.text = selectedText;
    this.lastSelection = new Date();
  }

  public async speak(selectedText) {
    const params = { text: selectedText, from: 'pt-br', to: 'en' };

    const text = await translate(params);
    await this.reproduceAudio(selectedText, text as string);
  }
  
  async reproduceAudio(textTarget: string, translation: string) {
      await speak('Hi SFNode! the translation for', 'Moira');
      await speak(textTarget, 'Luciana');
      await speak(
        `will be translated to our language as :${translation}`,
        'Moira',
      );
    
  }
  private async _verifySelection() {
    setInterval(async () => {
      const lastSelection = this.lastSelection.getTime();
      const now = Date.now();
      const difference = now - lastSelection;
      const LIMIT = 1000;
      if (difference <= LIMIT || this.text === '') {
        return;
      }
      console.log('translating...', this.text);
      const text = this.text;
      this.text = '';
      try {
        await this.speak(text);
      } catch (error) {
        console.log('error!', error)
      }
    }, 500);
  }
}
