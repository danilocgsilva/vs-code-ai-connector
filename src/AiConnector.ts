import * as vscode from "vscode";

export class AiConnector {
  async isOllamaRunning(ollamaHost: string) {
    try {
      const res = await fetch(`http://${ollamaHost}:11434/api/tags`);
      return res.ok;
    } catch {
      return false;
    }
  }

  writeIntoCursor(aiHost: string): vscode.Disposable {
    const disposable = vscode.commands.registerCommand(
      "ai-connector.insertText",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showErrorMessage("No active editor");
          return;
        }

        if (!(await this.isOllamaRunning(aiHost))) {
          vscode.window.showErrorMessage(
            `Ollama is not running in ${aiHost}. Please start Ollama and try again.`,
          );
          return;
        } else {
          vscode.window.showInformationMessage(
            "Ollama is running. Wen can begin...",
          );
        }

        const position = editor.selection.active;

        await editor.edit((editBuilder) => {
          editBuilder.insert(position, "Hello from AI Connector! New insert!");
        });
      },
    );

    return disposable;
  }
}
