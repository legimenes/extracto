# extracto app

## TO-DOs
Frontend: Extract export button to a component  
Frontend: Create pages  
Frontend: Create menu sidebar  
Frontend: Back <StrictMode>  

## Backend setup

### Express and TypeScript
```
npm init -y
npm install express
npm install -D typescript @types/express ts-node-dev tsconfig-paths
```

### Configuring TypeScript
```
npx tsc --init
```

The tsconfig.json is customized.

### Eslint
```
npm init @eslint/config@latest
npm install -D @stylistic/eslint-plugin-ts
```

### Execution scripts
```json
"scripts": {
  "dev": "ts-node-dev -r --respawn --transpile-only --ignore-watch node_modules src/server.ts",
  "test": "jest"
}
```

### jest
```
npm install -D jest ts-jest @types/jest
```

Create jest.config.js:
```
npx jest --init
```

### dotenv
```
npm install dotenv
```

### OFX Data extractor
```
npm install ofx-data-extractor
```

### CSV Writer
```
npm install csv-writer
```

### date fns
```
npm install date-fns
```

### Multer
```
npm install multer
npm install -D @types/jest
```

### CORS
```
npm install cors
npm install -D @types/cors
```

### Sqlite
```
npm install sqlite sqlite3
```

### Running
Debug test:
In Javascript Debug Terminal
```
cd backend
npm test
```

Run test:
```
npm test
npx jest .\test\<testefile>.test.ts
```

Run dev:
```
npm run dev
```

---

## Frontend setup

### Build using vite
```
npm create vite@latest .
npm init -y
``` 

### Tailwind
```
npm install -D tailwindcss
npx tailwindcss init
```

### React Router
```
npm install react-router-dom
npm install -D @types/react-router-dom
```

### Axios
```
npm install axios
```

### date fns
```
npm install date-fns
```

### Running
Run dev:
```
npm run dev
```

---

## References

**eslint**
https://eslint.org/docs/latest/

**stylistic**
https://eslint.style/packages/ts

**typescript-eslint**
https://typescript-eslint.io/rules/

**tailwind**
https://tailwindcss.com/docs/guides/create-react-app