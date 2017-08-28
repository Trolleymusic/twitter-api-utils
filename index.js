'use strict'

const fs = require('fs')
const request = require('request')
const Twitter = require('twitter')

class TwitterUtils {
  constructor (consumerKey, consumerSecret) {
    this.consumerKey = consumerKey
    this.consumerSecret = consumerSecret
  }

  getBearerToken () {
    const encodedConsumerInfo = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64')
    const url = 'https://api.twitter.com/oauth2/token'
    const body = 'grant_type=client_credentials'
    const headers = {
      'Authorization': `Basic ${encodedConsumerInfo}`,
      'content-type': 'application/x-www-form-urlencoded'
    }

    return new Promise((resolve, reject) => {
      request.post({body, headers, url}, (error, response, body) => {
        if (error) {
          return reject(error)
        }

        const token = JSON.parse(body).access_token

        return resolve(token)
      })
    })
      .then(token => {
        this.bearerToken = token
        return token
      })
  }

  getStatuses ({screenName}) {
    const client = new Twitter({
      'bearer_token': this.bearerToken,
      'consumer_key': this.consumerKey,
      'consumer_secret': this.consumerSecret
    })

    const options = {
      'screen_name': screenName
    }

    return client.get('statuses/user_timeline', options)
  }

  writeFile ({contents, path}) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(contents), (error, result) => {
        if (error) {
          return reject(error)
        }
        return resolve(result)
      })
    })
  }
}

module.exports = TwitterUtils
