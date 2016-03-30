# Worona Core Development

## Installation

Clone this repo or [download the zip file from Github](https://github.com/worona/worona-core/archive/master.zip).

```bash
git clone https://github.com/worona/worona-core.git
cd worona-core
```

----

[**Install Node**](https://nodejs.org/en/) if you haven't installed it yet. We recommend v4.

----

[**Install Meteor**](https://www.meteor.com/install) if you haven't installed it yet:

```bash
curl https://install.meteor.com/ | sh
```

----

Finally, run `npm run install:all` (not `npm install`) to install all the dependencies of each core module.

```bash
npm run install
```

## Development

Run the dashboard server.

```bash
npm run server
```

Open another terminal and run the dashboard and app clients.

```bash
npm run client
```

---

## Using local modules in extension/theme development

Use `npm run link` (not `npm link`) to be able to install them locally. You may have to `sudo` in OSX and Linux.

```bash
npm run link
# or...
sudo npm run link
```

Now go to the extension/theme development project folder. First, uninstall the npm packages:

```bash
cd myAwesomeWoronaExtension/
npm uninstall worona-app-client --save-dev
npm uninstall worona-dashboard-client --save-dev
npm uninstall worona-dashboard-server --save-dev
```

Then, use `npm link` to use your local modules:

```bash
npm link worona-app-client
npm link worona-dashboard-client
npm link worona-dashboard-server
```

That's it, now you are using these local modules.
