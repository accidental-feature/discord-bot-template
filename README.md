# Discord Bot Template

Creating a Discord bot has never been easier! This template comes slash command ready with a simple set up to get your bot up and running yourself!

## Features

* Easy to setup and run
* Discord.js v.14
* Simple Bang Command setup
* Rotatable bot status
* Slash Command ready
* Database Integration
* And more!

## Bots Created Using this Template

[Text.re](https://top.gg/bot/1132849339530743960)
[N0RM](https://discord.com/api/oauth2/authorize?client_id=1197103539512680488&permissions=1240105167991&scope=bot)

## Setup

To get this project up and running on your local machine, follow these steps:

### 1. Clone the Repository

First, you need to clone this repository to your local machine or fork it to your GitHub account:

* To clone the repository, run:

  ```bash
  git clone https://github.com/accidental-feature/discord-bot-template.git
  ```

* To fork the repository, click on the 'Fork' button at the top of this page and then clone your forked repository as shown above.

### 2. Install Node.js Packages

Navigate to the cloned repository's directory and install the required Node.js packages:

```bash
cd discord-bot-template
npm install
```

### 3. Set Up a Discord Bot

To set up a Discord bot, follow these steps:

* Go to the [Discord Developer Portal](https://discord.com/developers/applications).
* Click on the 'New Application' button. Give your application a name and create it.
* Navigate to the 'Bot' tab and click 'Add Bot'. Confirm the creation.
* Under the 'TOKEN' section, click 'Copy' to copy your bot's token (you'll need this for the .env file).

#### Invite the Bot to Your Server

* In the Discord Developer Portal, navigate to the 'OAuth2' tab.
* Under 'SCOPES', select 'bot'.
* Choose the appropriate permissions for your bot under 'BOT PERMISSIONS'.
* Copy the generated URL under 'SCOPES' and paste it into your web browser.
* Select a server to invite your bot to and authorize it.

### 4. Configure the Bot Token

Create a `.env` file in the root of your cloned repository and add your bot token:

```env
BOT_TOKEN=Your_Discord_Bot_Token
```

Replace `Your_Discord_Bot_Token` with the token you copied from the Discord Developer Portal.

### 5. Additional Configurations

#### Bot's Client ID

To find and configure your bot's client ID:

##### Find the Client ID

* Go to the [Discord Developer Portal](https://discord.com/developers/applications).
* Open your application.
* The 'Client ID' can be found under the 'Application Information' section.

##### Add the Client ID to the Project

* Open the file `src/functions/HandleCommands.js` in your project.
* Modify the `clientId` variable at the top of the file:

  ```javascript
  const clientId = 'YOUR_CLIENT_ID';
  ```

#### Guild ID (Optional)

If you wish to use specific features tied to a particular server (guild), you will need its ID.

##### Find the Guild ID

* Open Discord and go to your server.
* Right-click on the server name and select 'Copy ID'. If you don't see this option, enable 'Developer Mode' in your Discord settings under 'Appearance' -> 'Advanced'.

##### Add the Guild ID to the Project

* Open the file `src/functions/HandleCommands.js`.
* Modify the `guildId` variable:

  ```javascript
  const guildId = 'YOUR_GUILD_ID';
  ```

* Replace YOUR_GUILD_ID with the guild ID you copied. If you prefer not to use a specific guild ID, you can leave it as an empty string or remove it.

Ensure that you save the changes to `src/functions/HandleCommands.js` after modifying it. This configuration is crucial for the bot's interaction with Discord's API specific to your application and server.

#### Setup MongoDB Integration

1. **Create a MongoDB Account**:
   - Go to [MongoDB's website](https://www.mongodb.com/) and sign up for an account.
   - Choose the free tier for a simple start, which is sufficient for basic bot functionalities.

2. **Create a Cluster**:
   - After logging in, create a new cluster. Choose the free tier option.
   - Select a cloud provider and a region that is closest to you for better performance.
   - Click on "Create Cluster" at the bottom of the page.

3. **Configure Database Access**:
   - Navigate to the "Database Access" section under "Security".
   - Add a new database user with read and write privileges. Remember the username and password; you will need them to connect your bot to the database.

4. **Configure Network Access**:
   - Go to the "Network Access" section.
   - Add a new IP address. For development, you can allow access from anywhere by using `0.0.0.0/0`.

5. **Get Your Database Connection URL**:
   - Once your cluster is set up, go to the "Clusters" section.
   - Click on "Connect" -> "Connect your application".
   - Choose the driver and version (usually Node.js) and copy the connection string provided.

6. **Configure the Bot to Use MongoDB**:
   - In your project, create or update your `.env` file with the MongoDB connection string:

     ```env
     MONGODB_URI=Your_MongoDB_Connection_String
     ```

   - Replace `Your_MongoDB_Connection_String` with the connection string you copied from MongoDB. Replace `<password>` with the database user's password you created earlier, and change `myFirstDatabase` to your preferred database name.

### 6. Run the Project

Finally, you can run the project using:

```bash
node .
```

OR

```bash
nodemon
```

Your Discord bot should now be online and functioning in your server!

## Questions/Suggestions/Bug Reports

**Please read the [Issues List](https://github.com/accidental-feature/discord-bot-template/issues) before suggesting a feature**. If you have a question, need troubleshooting help, or want to brainstorm a new feature, please start a [Discussion](https://github.com/accidental-feature/discord-bot-template/discussions). If you'd like to suggest a feature or report a reproducible bug, please open an [Issue](https://github.com/accidental-feature/discord-bot-template/issues) on this repository.

### Join the [VARIETY Discord](https://discord.gg/d93DZHqz39)
