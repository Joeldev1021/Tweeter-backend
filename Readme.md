## Tweete
This project is of  [DevChallenge-Twitter-Clone](https://devchallenges.io/challenges/rleoQc34THclWx1cFFKH)


*NOTE: This repository is an example to explain 'how to implement DDD architecture on a Typescritps web application'. If you will to use this as a reference, add your implementation of authentication and security before deploying to the real world!!*



## Tech Stack

* [Express](https://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Mongodb](https://www.mongodb.com/)
* [Inversify](https://inversify.io//)
* [Docker](https://www.docker.com/)

## Code Architecture

Directory structure based on Domain driver design 

```tree

├── src
│   ├── domain 
│   │   ├── contans
│   │   ├── errors
│   │   ├── repository
│   │   └── value-objects
│   ├── application
│   │   ├── errors
│   │   └── usecases
│   └── infrastruture
│       ├── controllers 
│       │   ├── user-login.controller.ts
│       │   ├── user-register.controller.ts
│       │   └── user-profile.controller.ts
│       ├── dtos
│       │   ├── tweet.dto.ts
│       │   ├── user-login.dto.ts
│       │   └── user-register.dto.ts
│       ├── errors
│       ├── middlewares
│       │   ├── error.middleware.ts
│       │   └── auth.middleware.ts
│       ├── repositories
│       │   ├── user.repository.ts
│       │   └── tweet.repository.ts
│       ├── schemas
│       │   ├── user.schema.ts
│       │   └── tweet.schema.ts
│       ├── services
│       └── types
├── app.ts
├── containers.ts
├── index.ts
└── types.ts

```

### Model 

To represent an Moddel in Typescript

```ts
export class UserModel {

    constructor(
        public readonly id: UuidVO,
        public username: UsernameVO,
        public email: EmailVO,
        public password: PasswordVO,
    ) { }

    
}

```

### Value Object

To represent a Value Object `UuidVO`.

```ts
export class UuidVO extends ValueObject<string> {


    public assertIsValid(value: string): void {
        if (!validate(value)) {
            throw new VOFormatException(UuidVO.name, value)
        }
    }

    public equals(valueObject: UuidVO) {
        return this.value === valueObject.value
    }
}
```
#####the application should have these functions

   * User story: I can see my profile or others' profile

   * User story: When I am on a profile, I can see Tweets and Retweets. I can also filter by Tweets, Tweets and replies, Media and Likes

   * User story: When I am on a profile, I can see followers and following

   * User story: When I am on a profile, I can see follow or unfollow the user

   * User story: I can navigate between Home, Explore and Bookmarks

   * User story: I can navigate to My Profile, Group Chat (optional), Setting/Authentication App.

   * User story: When I am on Home, I can post a new Tweet

   * User story: When I post a new Tweet, I can choose to upload an image and set the Tweet to be public or only-follower

   * User story: When I am on Home, I can see Tweets of people who I follow

   * User story: I can Comment, Retweet, Like or Save a Tweet

   * User story: I can Comment with image and I can like a comment

   * User story: I can see the posted time of the Comments and Tweets

   * User story: When I am on Home, I can see the most popular hashtags and people I should follow (it's up to you how to implement this)

   * User story: When I am on Explore, I can see the Top, Latest Tweet, or Tweet with Media. I can also choose to see the most popular people

   * User story: When I am on Bookmarks, I can see the Saved Tweet

   * User story(optional): I can search for a group

#### Readme not completed 😢