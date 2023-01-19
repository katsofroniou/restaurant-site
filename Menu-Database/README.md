# Setting up the database

Make sure that you have the cloned this repo to your device. Once you've done that (or if you have already cloned it) open a new terminal window and navigate to the folder you have the repo in - it should contain a `.git` folder.
Run `git pull` in the terminal to ensure you have the latest versions of each file before attempting to run the database.

1. Install the required packages by running `pip install -r requirements.txt` in the terminal.
2. Download and install [PostgreSQL](https://www.postgresql.org/download/) and [pgAdmin 4](https://www.pgadmin.org/download/)
3. Setup a server in pgAdmin following [this tutorial](https://www.youtube.com/watch?v=wuyDrVqjC4w); you only need to watch up until 02:20
4. Open config.py and change it to use your details. (It is detailed in the file as to how). Make sure you save it before continuing to the next step.
5. Open `database.py` and run it.
6. If you have connected correctly, you should now be able to go back to pgAdmin 4 and see the database and table have now been created.

<!-- Download 'Docker' from [this website](https://www.docker.com/products/docker-desktop/). There is also more documentation [here](https://docs.docker.com/get-started/) on how to use it. -->