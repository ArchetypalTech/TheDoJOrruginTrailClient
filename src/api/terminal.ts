import { updateScene } from "../three";

export function sendCommand(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		// Simulate a terminal command
		setTimeout(() => {
			const response = `⨽ Command executed: ${command}`;
			updateScene(command);
			resolve(response);
		}, 1000);
	});
}
