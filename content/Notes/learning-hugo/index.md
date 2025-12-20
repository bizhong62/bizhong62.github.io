+++
date = '2025-12-18T15:42:39-06:00'
title = 'Learning Hugo'
+++

## Install Hugo on Raspberry Pi:
1. Update Linux Repository:  
    **sudo apt update**  
2. Install snapd deamon:  
    **sudo apt install snapd**  
3. Reboot system to make change take in effect:  
    **sudo reboot**  
4. Install the snap core to be able to use snap:  
    **sudo snap install core**  
5. Now we are ready to install hugo:  
    **sudo snap install hugo**  
6. To verify the hugo installation and see its version:  
    **snap list**  
    ```
    Name    Version             Rev    Tracking       Publisher     Notes
    core    16-2.61.4-20250910  17276  latest/stable  canonical✓    core
    core22  20251009            2164   latest/stable  canonical✓    base
    hugo    0.152.2             24983  latest/stable  hugo-authors  -
    snapd   2.72                25585  latest/stable  canonical✓    snapd
    ```

## Create First Hugo Site:
1. Create a new site with following command:  
    **hugo new site Hugosite**
2. Make the newly created Hugosite your current working directory:  
    **cd Hugosite**
3. Create a git repository at the Hugosite root directory:  
    **git init**
4. Create a hugo theme using submodule command:  
    **git submodule add https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn**  
5. Add the following line at the end of hugo.toml file:  
    *theme = 'hugo-theme-relearn'*  
6. Add one page into the new site:  
    **hugo new content Notes/Learning-Hugo.md**  
    then add some content into the content/NotesLearning-Hugo.md file.
7. Test the newly created site:  
    **hugo server -D**
8. Initial result:  
    point your browser at [http://localhost:1313](http://localhost:1313), the new page should show up.

## Deploy Hugosite to the github site:  
1. Change the baseURL in hugo.toml file as following  
    baseURL = 'https://bizhong62.github.io/'
2. remove draft = true line from hugo.toml file.  
2. Create a github account.  
3. Create a new github public remote repository named username.github.io.  
4. Now select the newly created remote repository bizhong62.github.io.
5. in the setting of this particular repository, in left hand side panel, select code and automation->page, there is a Build and deployment source pull down button: select Git Actions.
6. Create Hugosite/.github/workflows/hugo.yaml, this file will contain the action used by github to generate HTML. copy and paste following into the file.
```
name: Deploy Hugo site to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches:
      - main

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

# Default to bash
defaults:
  run:
    shell: bash

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.141.0
      hugo_extended_ : true
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
      - name: Install Dart Sass
        run: sudo snap install dart-sass
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
      - name: Install Node.js dependencies
        run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
      - name: Build with Hugo
        env:
          # For maximum backward compatibility with Hugo modules
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --gc \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./public

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
7. Add .github directory and the file in it into the local repository.
8. Run following command to push the new changes to the remote repository:  
    **git add .github**  
    **git commit -m'add github action file' .github**  
    **git push -u origin main**  
9. Now go to the github site. we should see a action named: <mark>Deploy Hugo site to Pages</mark> running.
10. After it finish and successful. point your browser to https://bizhong62.github.io/
now the site is deployed to git hub.

## Deploy HugoHome to the Nginx server(minnow):
  1. Generate static site files:  
      **hugo --minify**  
    all the files needed to be deployed to the web server are located in the public directory.

  2. Package the directory into a tarball:  
      **tar -czf public.tgz public**

  3. Scp the tarball onto the deployment server:  
      **scp public.tgz minnow:/home/bizhong/OrgNotes**

  4. Untar the tarball on the minnow server:  
      **tar -xvzf public.tgz**

  5. Check configuration:  
      **sudo nginx -t**

  6. Restart Nginx service:  
      **sudo systemctl restart nginx**


