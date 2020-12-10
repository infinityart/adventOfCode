import {serve} from "https://deno.land/std@0.80.0/http/server.ts";

const server = serve({port: 8000});

for await (const req of server) {
    (async function() {
        try{
            let dayToLoad = req.url === "/" ? "day1" : req.url;
            dayToLoad = dayToLoad.replace(/^\//, "");

            const dayModulePath = `./${dayToLoad}/script.ts`;
            const {default: dayModule} = await import(dayModulePath);
            const timesToTest = 1000;

            const start = performance.now();

            for(let i = 0; i < timesToTest; i++) {
                await dayModule();
            }

            const milliseconds = (performance.now() - start);
            const averageTimeToRun = (milliseconds / timesToTest);

            console.log(`Average speed: ${averageTimeToRun} milliseconds`);
            req.respond({body: `${dayToLoad}\nAverage speed: ${averageTimeToRun} milliseconds\n`});
        } catch(e) {
            console.log(e);
            req.respond({body: "Day hasn't been made yet...\n"});
        }
    })();
}