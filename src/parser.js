import fs from 'node:fs'
import { parse } from 'csv-parse';

const exampleCsvPath = new URL('./example.csv', import.meta.url)

const stream = fs.createReadStream(exampleCsvPath)

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function run() {
  const lines = stream.pipe(csvParse)

  for await (const line of lines) {
    const [title, description] = line

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }
}

run()