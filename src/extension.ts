import * as vscode from 'vscode';
import { AiConnector } from './AiConnector';

const aiConnector = new AiConnector();

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('aiConnector');
	const aiHost = config.get<string>('ai_host') || 'localhost';

	const writeIntoCursorDisposable = aiConnector.writeIntoCursor(aiHost);
	context.subscriptions.push(writeIntoCursorDisposable);
}

export function deactivate() {}
