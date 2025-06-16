import * as vscode from "vscode";
import { exec } from "child_process";

type Handler = {
  name: string;
  io: string[];
};

let handlers: Handler[];
let outputChannel: vscode.OutputChannel =
  vscode.window.createOutputChannel("UseCaseDiscovery");

export function activate(context: vscode.ExtensionContext) {
  const discoverCommand = vscode.commands.registerCommand(
    "usecase-discovery.discoverUseCases",
    async () => {
      console.log("Discovering use cases...");
      const useCaseHandlers = (await findHandlers("UseCaseHandler")).map(
        parseUseCaseHandler
      );
      const voidUseCaseHandlers = (
        await findHandlers("VoidUseCaseHandler")
      ).map(parseUseCaseHandler);

      handlers = [...useCaseHandlers, ...voidUseCaseHandlers];

      console.log(handlers.length);
      console.log(handlers);
    }
  );

  const autoComplete = vscode.languages.registerCompletionItemProvider("java", {
    provideCompletionItems: (document, position, token, context) => {
      return handlers.map((handler) => {
        return {
          label: `${handler.name}<${handler.io.join(", ")}>`,
          kind: vscode.CompletionItemKind.Class,
        };
      });
    },
  });

  context.subscriptions.push(discoverCommand, autoComplete);
}

function parseUseCaseHandler(input: string): Handler {
  // Extract the UseCaseHandler part from the full line
  const handlerMatch = /implements\s+(\w+<[^>]+>)/.exec(input);
  if (!handlerMatch) {
    throw new Error("Input does not match the expected format.");
  }

  const handlerString = handlerMatch[1];
  const regex = /^(\w+)<\s*([^>]+)\s*>$/;
  const match = regex.exec(handlerString);

  if (!match) {
    throw new Error("Input does not match the expected format.");
  }

  const mainType = match[1];
  const genericTypes = match[2].split(",").map((type) => type.trim());

  // Output the handler string
  outputChannel.show();
  outputChannel.appendLine(`${mainType}<${genericTypes.join(", ")}>`);

  return { name: mainType, io: genericTypes };
}

async function findHandlers(input: string): Promise<string[]> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace folder found.");
    return [];
  }

  const workspacePath = workspaceFolders[0].uri.fsPath;
  // Using a simpler pattern that will work better with grep
  const searchPattern = `implements[[:space:]]*${input}<[^>]*>`;

  // Execute the grep command
  const stdout = await execPromise(
    `grep -Er "${searchPattern}" ${workspacePath}/src`
  );
  const results = stdout.split("\n").filter((line) => line.trim() !== "");

  vscode.window.showInformationMessage(
    `Found ${results.length} matches for ${input}.`
  );

  return results;
}

function execPromise(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      console.log(`Executing command: ${command}`);
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

export function deactivate() {
  console.log("Extension deactivated.");
}
