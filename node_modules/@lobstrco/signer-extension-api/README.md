# @lobstrco/signer-extension-api

This packages builds a wrapper around the messaging system used to interact with the LOBSTR browser extension. Client applications will be able to install this package from npm and then integrate with the LOBSTR signer extension using dev-friendly methods.

## Getting Started
To get started, you’ll need both the LOBSTR signer extension and the API needed to integrate with it.

### Install the LOBSTR signer extension.
You’ll require a local version of the extension to test.

- Head over to the Chrome Web Store and install LOBSTR signer extension into your browser.

### Install LOBSTR signer extension API
Now, you need a way to communicate with the LOBSTR signer extension. To facilitate this, we created a Javascript library called **@lobstrco/signer-extension-api** that will let you send and receive messages from the extension.

#### For ES2023 applications
- Install the module using npm: ```npm install @lobstrco/signer-extension-api```

or

- Install the module using yarn: ```yarn add @lobstrco/signer-extension-api```

#### For browser-based applications
Install the packaged library via script tag using cdnjs, swapping in the desired version number for ```{version}```:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lobstrco-signer-extension-api/{version}/index.min.js"></script>
```

## Using LOBSTR signer extension in a web app
You now have an extension installed on your machine and a library to interact with it. This library will provide methods to send and receive data from a user’s extension on your website or application.

### Importing
First import the whole library in an ES2023 application

```javascript
import lobstrApi from "@lobstrco/signer-extension-api";
```

or import just the modules you require:

```javascript
import {
 isConnected,
 getPublicKey,
 signTransaction,
} from "@lobstrco/signer-extension-api";
```

Now let's dig into what functionality is available to you:

### isConnected

```isConnected() -> <Promise<boolean>>```

This function is used to determine whether a user has the LOBSTR signer extension installed in your application.

```javascript
import { isConnected } from "@lobstrco/signer-extension-api";

if (await isConnected()) {
  alert("User has LOBSTR extension installed!");
}
```

### getPublicKey

```getPublicKey() -> <Promise<string>>```

If the LOBSTR wallet app is installed, the LOBSTR signer extension will simply return the public key. If either of the above is not true, it will return an empty string.

```typescript
import { getPublicKey } from "@lobstrco/signer-extension-api";

const retrievePublicKey = async (): Promise<string> => {
  let publicKey = "";
  let error = "";

  try {
    publicKey = await getPublicKey();
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return publicKey;
};
```

### signTransaction

```signTransaction(xdr: string) -> <Promise<string>>```

This function accepts a transaction XDR string, which it will decode, sign as the user, and then return the signed transaction to your application.

*NOTE:* The user must provide a valid transaction XDR string for the extension to properly sign.


```typescript
import { signTransaction } from "@lobstrco/signer-extension-api";

const userSignTransaction = async (xdr: string): Promise<string> => {
  let signedTransaction = "";
  let error = "";

  try {
    signedTransaction = await signTransaction(xdr);
  } catch (e) {
    error = e;
  }

  if (error) {
    return error;
  }

  return signedTransaction;
};
```

## Using LOBSTR in the browser
You now have the LOBSTR signer extension installed on our machine and a library to interact with it. This library will provide you methods to send and receive data from a user’s extension in your website or application.

### Importing
First import the library in the ```<head>``` tag of your page.

- Install the packaged library via script tag using cdnjs, swapping in the desired version number for ```{version}```

```html
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/lobstrco-signer-extension-api/{version}/index.min.js"></script>
</head>
```

This will expose a global variable called window.lobstrSignerExtension that will contain our library.

The call signatures will be exactly the same as the node version, but you will call the methods directly from window.lobstrSignerExtensionApi:

For example:

```javascript
if (await window.lobstrSignerExtensionApi.isConnected()) {
  alert("User has LOBSTR extension installed!");
}
```