from sqlalchemy.engine.url import URL

# Change to false if you are not using SSH tunneling
# To set up SSH tunneling use the following command in your terminal

### ssh -L 9999:teachdb:5432 YOUR_USERNAME@linux.cim.rhul.ac.uk

SSH_TUNNEL = True

DATABASE_URI = URL.create(
    "postgresql",
    username="group13",
    password="ieziet",
    host="localhost" if SSH_TUNNEL else "teachdb.cs.rhul.ac.uk",
    port=9999 if SSH_TUNNEL else 5432,
    database="CS2810/group13"
)