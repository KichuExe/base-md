FROM quay.io/toxic_kichux/whatskrizai:latest
RUN git clone https://github.com/Djjdkdm/CLASH-WA-BOT /root/CLASH-WA-BOT/
WORKDIR /root/CLASH-WA-BOT/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js", "--max_old_space_size=2560"]
