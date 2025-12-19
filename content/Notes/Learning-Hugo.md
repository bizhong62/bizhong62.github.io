+++
date = '2025-12-18T15:42:39-06:00'
title = 'Learning Hugo'
+++

## Install Hugo on Raspberry Pi:
    1. sudo apt update
    2. sudo apt install snapd

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
1. xxx
2. xxx

