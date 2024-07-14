# Account Frontend Project

## Running the Project

To run the application, you have two options: using Java or Docker.

### Using Docker (recommended)

1. Ensure Docker installed on your machine. If not, you can download it from [here](https://docs.docker.com/get-docker/).
2. Clone the project repository and navigate to the project root directory.

3. In the project repository open a terminal window and run the command to build a docker container

   ```
   docker build -t angular-app .
   ```

4. Next in the same terminal run the command, to start the container with the application.

   ```
   docker run -p 80:80 angular-app
   ```

   The application will be accessible at [http://localhost](http://localhost).

### Using Java

1. Install Node: Follow the instructions on [this website](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
   to install Node on your machine.
2. Install the Angular CLI: by running the following command in a terminal:

   ```
   npm install -g @angular/cli
   ```

3. Clone the project repository and navigate to the project root directory.

4. Install project dependencies: In the project repository open a terminal window and run the command

   ```
   npm install
   ```

5. Run the application: In the same terminal window run the command

   ```
   ng serve
   ```

   The application will be accessible at [http://localhost:4200](http://localhost:4200).

> For this application to function correctly the companion backend application should also be up and running.

> The backend application can be found here [Backend Application Github](https://github.com/mari-mbiru/Compulnyx-Practical-Interview-Backend)
