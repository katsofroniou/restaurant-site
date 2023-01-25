# Setting up the database

Make sure that you have the cloned this repo to your device. Once you've done that (or if you have already cloned it) open a new terminal window and navigate to the folder you have the repo in - it should contain a `.git` folder.
Run `git pull` in the terminal to ensure you have the latest versions of each file before attempting to run the database.

1. Install the required packages by running `pip install -r requirements.txt` in the terminal.
2. Use this SSH tunneling command in your terminal so that you can access the database on your own device `ssh -L 9999:teachdb:5432 YOUR_USERNAME@linux.cim.rhul.ac.uk`
3. Run databases.py and make sure that no errors occur
