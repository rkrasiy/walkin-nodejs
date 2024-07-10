# Usa una imagen base oficial de Node.js
FROM node:20.2.0-alpine3.17

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json al directorio de trabajo
COPY package.json ./

# Instala las dependencias del proyecto
RUN yarn install

# Copia el resto de los archivos de la aplicación al directorio de trabajo del contenedor
COPY . .

# Construye la aplicación Next.js
RUN yarn build

# Exponer el puerto en el que la aplicación estará corriendo
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación Next.js en modo producción
CMD ["yarn", "start"]