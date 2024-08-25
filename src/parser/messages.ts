
export async function postParse(message: string, request: any) {
    let formData = new FormData();
    let waitHook;
    let hook;

	hook = request.hook

    if (hook) {
        if (hook.includes("?")) {
            waitHook = hook + "&wait=true";
        }
        else {
            waitHook = hook + "?wait=true";
        }
    }
    else {
        waitHook = undefined;
    }
	
    formData.append('payload_json', JSON.stringify(request.params));
    return { waitHook: waitHook, formData: formData };
}