import * as vscode from 'vscode';
import fetch from 'node-fetch';

async function isOllamaRunning() {
	try {
		const res = await fetch('http://localhost:11434/api/tags');
		return res.ok;
	} catch {
		return false;
	}
}

function writeIntoCursor(): vscode.Disposable {
	const disposable = vscode.commands.registerCommand('ai-connector.insertText', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No active editor');
			return;
		}

		const position = editor.selection.active;

		await editor.edit(editBuilder => {
			editBuilder.insert(position, 'Hello from AI Connector! New insert!');
		});
	});

	return disposable;
}

export function activate(context: vscode.ExtensionContext) {
	const writeIntoCursorDisposable = writeIntoCursor();

	context.subscriptions.push(writeIntoCursorDisposable);
}

export function deactivate() {}
