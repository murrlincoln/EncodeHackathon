'use client'
import { SSX } from "@spruceid/ssx";
import { useState } from "react";

const SSXComponent = () => {

	console.log('SSXComponent');

    const [ssxProvider, setSSX] = useState<SSX | null>(null);

    const ssxHandler = async () => {
		console.log('ssxHandler');
        const ssx = new SSX({
            providers: {
                server: {
                    host: "http://localhost:3000/api"
                }
            },
        });
		console.log('ssx', ssx);
        await ssx.signIn();
		console.log('ssx after sign in', ssx);
        setSSX(ssx);
    };

    const ssxLogoutHandler = async () => {
        ssxProvider?.signOut();
        setSSX(null);
    };

    const address = ssxProvider?.address() || '';

    return (
        <div className="App">
            <div className="App-header">
                <h1>&nbsp;SSX Example dapp</h1>
            </div>
            {
                ssxProvider ?
                    <div className="App-content">
                        <h2>
                            Account Info
                        </h2>
                        <div>
                            {
                                address &&
                                <p>
                                    <b>Address:</b> <code>{address}</code>
                                </p>
                            }
                        </div>
                        <button onClick={ssxLogoutHandler}>
                            Sign-Out
                        </button>
                    </div> :
                    <div className="App-content">
                        <h2>
                            Connect and Sign-In with your Ethereum account.
                        </h2>
                        <button onClick={ssxHandler}>
                            Sign-In with Ethereum
                        </button>
                    </div>
            }
        </div>
    );
};

export default SSXComponent;
