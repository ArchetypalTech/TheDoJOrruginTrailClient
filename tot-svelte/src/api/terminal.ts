import * as DJ from "../../bindings/typescript_v2/the_oruggin_trail.ts";

export function sendCommand(command: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
		//await processCommand(command, resolve); // promise is resolved in socket.onnotification
	});
}


function get_config() {
    let initialConf = DJ.;
    let tot = DJ.TheOrugginTrail; 
}
