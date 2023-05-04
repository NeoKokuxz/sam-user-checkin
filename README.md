# sam-user-checkin

## Logic

User check in with the lambda function.
Lambda function put the user on the check in list and save their checkin time and refresh duration.
Once user exhausted their daily usage count and they are already on the list, they are blocked for the day.

## Build

```bash
sam build
```

## Deploy

```bash
- For initial deployment
sam deploy --guided
- Normal deployment for changes
sam deploy
```

## Watch - Sync

```bash
sam sync --watch
```

## Test

### Get AWS API Endpoints

```bash
sam list endpoints --output json
```

### Test with API Endpoints

```bash
curl https://r0klnjwfbg.execute-api.us-east-1.amazonaws.com/Prod/checkin
```

### Test locally
