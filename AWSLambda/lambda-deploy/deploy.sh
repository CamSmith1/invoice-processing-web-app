docker build -t invoiceocrcontainer .
docker tag invoiceocrcontainer:latest 945616793337.dkr.ecr.us-east-1.amazonaws.com/invoiceocrrepo:latest2
docker push 945616793337.dkr.ecr.us-east-1.amazonaws.com/invoiceocrrepo:latest2





