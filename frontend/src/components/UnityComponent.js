import React, {Fragment} from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityComponent = ({gameName, setGameComplete}) => {
    const { unityProvider, unload } =
        useUnityContext({
            loaderUrl: `/Build/${gameName}.loader.js`,
            dataUrl: `/Build/${gameName}.data`,
            frameworkUrl: `/Build/${gameName}.framework.js`,
            codeUrl: `/Build/${gameName}.wasm`
        });

    function handleClick() {
        unload();
        setGameComplete(true);
    }
    return (
        <Fragment>
  <Unity unityProvider={unityProvider} />
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
    onClick={handleClick}
  >
    Back
  </button>
</Fragment>

    )
}

export default UnityComponent