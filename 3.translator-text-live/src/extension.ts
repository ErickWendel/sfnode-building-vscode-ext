'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const say = require('say');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "text" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json

  context.subscriptions.push(new TradutorController());
}

// this method is called when your extension is deactivated
export function deactivate() {}
class TradutorController {
  constructor() {
    console
    let subscriptions: vscode.Disposable[] = [];
    vscode.window.onDidChangeTextEditorSelection(
      this._onEvent,
      this,
      subscriptions,
    );
  }
  dispose() {}
  async _onEvent() {
    const sleep = ms => new Promise(r => setTimeout(r, ms * 1000))
    const speak = async (text, voice = 'Moira') =>  {
      const Say = require('say');
      Say.speak(text, voice)
      return sleep(text.length / 10);
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const select = editor.selection;
    const text = editor.document.getText(select);
    if (!text) return;

    console.log('text', text)
    await speak(text)
  }
}
// class TradutorController {
//   constructor() {
//     let subscriptions: vscode.Disposable[] = [];
//     vscode.window.onDidChangeTextEditorSelection(
//       this._onEvent,
//       this,
//       subscriptions,
//     );
//   }
//   dispose() {}
//   async _onEvent() {
//     const speak = (text, voice) =>
//       new Promise((resolve, reject) =>
//         say(text, voice, 0.5, (err, res) => (err ? reject(err) : resolve(res))),
//       );
//     const editor = vscode.window.activeTextEditor;
//     if (!editor) {
//       return;
//     }
//     const select = editor.selection;
//     const text = editor.document.getText(select);
//     if (!text) {
//       return;
//     }

//     console.log('text', text);
//     await speak(text, 'Luciana');
//   }
// }
