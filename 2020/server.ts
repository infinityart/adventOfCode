import {serve} from "https://deno.land/std@0.80.0/http/server.ts";

const server = serve({port: 9000});

for await (const req of server) {
    (async function () {
        try {
            const PartMap = ["One", "Two"];

            const requestedUrl: string = req.url === "/" ? "1/1" : req.url;
            let [day, part] = requestedUrl
                .replace(/^\//, "")
                .split("/");

            if (!part) part = "1";

            const dayModulePath = `./day${day}/script.ts`;
            const dayModule = await import(dayModulePath);

            const partToLoad = dayModule[`part${PartMap[parseInt(part) - 1]}`]

            const timesToTest = 1;
            const start = performance.now();

            for (let i = 0; i < timesToTest; i++) {
                await partToLoad();
            }

            const milliseconds = (performance.now() - start);
            const averageTimeToRun = (milliseconds / timesToTest);

            console.log(`Average speed: ${averageTimeToRun} milliseconds`);
            req.respond({body: `Day-${day} part-${part}\nAverage speed: ${averageTimeToRun} milliseconds\n`});
        } catch (e) {
            console.log(e);
            req.respond({body: "Day hasn't been made yet...\n"});
        }
    })();
}