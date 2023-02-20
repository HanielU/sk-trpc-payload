## How to Use

**Note:** Make sure you have a MongoDB instance running on your machine before starting the server.

### Development

```sh
cd ../../ # Go to the root of the project
pnpm run dev:server # Start the server in development mode
```

### Production (for Windows)

```sh
cd ../../ # Go to the root of the project
pnpm run build:win # Build the server
pnpm run start:server-win # Start the server in production mode
```

### Production (for Linux)

```sh
cd ../../ # Go to the root of the project
pnpm run build:server # Build the server
pnpm run start:server # Start the server in production mode
```


# Note the following!

In this project, **all non payload related** TypeScript files should end in .mts to indicate that they are esmodules. 

Every payload related file must end in the regular `.ts` extension **and must be imported with the `.js` extension**.

Please make sure to follow this naming convention when adding new TypeScript files to the project.
