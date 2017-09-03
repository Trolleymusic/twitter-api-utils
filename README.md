# Twitter API Utils

Collection of methods for working with the Twitter api. Developed for my own use.

Example of how to get the tweets of the specified account:

```javascript
const key = 'TWITTER_CONSUMER_KEY'
const secret = 'TWITTER_CONSUMER_SECRET'
const screenName = 'TWITTER_SCREEN_NAME'

const path = './tweets.json'

const twitterUtils = new TwitterUtils(key, secret)

twitterUtils.getBearerToken()
  .then(() => twitterUtils.getStatuses({screenName}))
  .then(contents => twitterUtils.writeFile({contents, path}))
  .catch(error => console.error(error))
```

### Instantiating:

```javascript
const twitterUtils = new TwitterUtils(consumerKey, consumerSecret)
```

Saves the `consumerKey` and `consumerSecret` for use by other methods

### Methods

#### `getBearerToken()`

*Returns a Promise, resolves to the returned bearer token*

From https://dev.twitter.com/oauth/reference/post/oauth2/token

> Allows a registered application to obtain an OAuth 2 Bearer Token, which can be used to make API requests on an application’s own behalf, without a user context. This is called Application-only authentication.

Call this first so that the other methods have permission to do what they need to do. This also saves the bearer token for use by other methods.

#### `getStatuses({screenName, count, excludeReplies})`

*Returns a Promise. Resolves to a tweets object.*

Gets the statuses of the specified screen name.

Optional arguments:

* `count`, the number of tweets to get - default `20`
* `excludeReplies`, get replies - counts against the `count` - default `true`

From: https://dev.twitter.com/rest/reference/get/statuses/user_timeline

> Returns a collection of the most recent Tweets posted by the user indicated by the screen_name or user_id parameters.

#### `writeFile({contents, path})`

*Writes a file. Resolves the result of `fs.writeFile`*

Handy useful way of spitting out tweets. You might stick this after `getStatuses` to write a file. `JSON.stringifies` the contents string.
