
FROM cypress/included:14.0.1

WORKDIR /e2e

COPY package.json package-lock.json ./

COPY . .

RUN npm install

CMD ["npx", "cypress", "run"]
