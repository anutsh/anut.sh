anut.sh
===============

Repository for the 2013 Summer Hackathon at Facebook Seattle.

## Install

1. First install [NodeJS](http://nodejs.org/)
2. Clone the repository
3. Run `npm install`

## Pushing to Live
1. Make changes to master branch
2. Test changes on master branch
3. Merge into live branch
4. Add live git repository
   * Add ssh key to server ``~/.ssh/authorized_keys``
   * ``git remote add live anutsh@anut.sh:anut.sh.git``
5. ``git push live live``
6. Git hook [post-update](https://github.com/zdwolfe/anut.sh/blob/master/config/git/hooks/post-update) runs
   * If the branch is "live" it runs [upstart script](https://github.com/zdwolfe/anut.sh/blob/master/config/etc/init/anut.sh.conf) that restarts server.js 
