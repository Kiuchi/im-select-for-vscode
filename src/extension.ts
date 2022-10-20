import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('im-select-for-vscode.turnOffJapanese', () => {
		switchJapaneseIME(false);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('im-select-for-vscode.turnOnJapanese', () => {
		switchJapaneseIME(true);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.window.onDidChangeActiveTextEditor((_) => {
		switchJapaneseIME(false);
	});
	context.subscriptions.push(disposable);

	disposable = vscode.window.onDidChangeWindowState((_) => {
		switchJapaneseIME(false);
	});
	context.subscriptions.push(disposable);
}

function switchJapaneseIME(isOn: boolean) {
	const zenhanExePath = vscode.workspace.getConfiguration().get<string>('im-select-for-vscode.cmdPath');
	if (zenhanExePath) {
		const args = isOn ? 'com.apple.inputmethod.Kotoeri.RomajiTyping.Japanese' : 'com.apple.keylayout.ABC';
		exec(`"${zenhanExePath}" ${args}`, (err, stdout, srderr) => { });
	}
}

export function deactivate() { }
