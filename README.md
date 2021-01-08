# MP-OPERATION-WEBSITE

小程序运营 Website

## 配置项

确保 `.env.development` `.env.production` `next.config.js` 中的配置项与所处环境保持一致

## 本地运行

```bash
npm ci

npm run dev
```

## 容器运行
```bash
cd mp-operation-website/

docker build -t website .

docker run -itd --name website -p 3000:3000 website
```

## 生产部署
```bash
docker run -itd --name website -p 3000:3000 website
```

## TODO
- 增加 env 配置文件，运行容器时，通过指定 env_file_path 动态注入环境变量