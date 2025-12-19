var relearn_searchindex = [
  {
    "breadcrumb": "Path to my memory \u003e Notes",
    "content": "Install Hugo on Raspberry Pi: 1. sudo apt update 2. sudo apt install snapd Create First Hugo Site: Create a new site with following command:\nhugo new site Hugosite Make the newly created Hugosite your current working directory:\ncd Hugosite Create a git repository at the Hugosite root directory:\ngit init Create a hugo theme using submodule command:\ngit submodule add https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn Add the following line at the end of hugo.toml file:\ntheme = ‘hugo-theme-relearn’ Add one page into the new site:\nhugo new content Notes/Learning-Hugo.md\nthen add some content into the content/NotesLearning-Hugo.md file. Test the newly created site:\nhugo server -D Initial result:\npoint your browser at http://localhost:1313, the new page should show up. Deploy Hugosite to the github site: Change the baseURL in hugo.toml file as following\nbaseURL = ‘https://bizhong62.github.io/' remove draft = true line from hugo.toml file. Create a github account. Create a new github public remote repository named username.github.io. Now select the newly created remote repository bizhong62.github.io. in the setting of this particular repository, in left hand side panel, select code and automation-\u003epage, there is a Build and deployment source pull down button: select Git Actions. Create Hugosite/.github/workflows/hugo.yaml, this file will contain the action used by github to generate HTML. copy and paste following into the file. name: Deploy Hugo site to Pages on: # Runs on pushes targeting the default branch push: branches: - main # Allows you to run this workflow manually from the Actions tab workflow_dispatch: # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages permissions: contents: read pages: write id-token: write # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued. # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete. concurrency: group: \"pages\" cancel-in-progress: false # Default to bash defaults: run: shell: bash jobs: # Build job build: runs-on: ubuntu-latest env: HUGO_VERSION: 0.141.0 hugo_extended_ : true steps: - name: Install Hugo CLI run: | wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \\ \u0026\u0026 sudo dpkg -i ${{ runner.temp }}/hugo.deb - name: Install Dart Sass run: sudo snap install dart-sass - name: Checkout uses: actions/checkout@v4 with: submodules: recursive fetch-depth: 0 - name: Setup Pages id: pages uses: actions/configure-pages@v4 - name: Install Node.js dependencies run: \"[[ -f package-lock.json || -f npm-shrinkwrap.json ]] \u0026\u0026 npm ci || true\" - name: Build with Hugo env: # For maximum backward compatibility with Hugo modules HUGO_ENVIRONMENT: production HUGO_ENV: production run: | hugo \\ --gc \\ --minify \\ --baseURL \"${{ steps.pages.outputs.base_url }}/\" - name: Upload artifact uses: actions/upload-pages-artifact@v4 with: path: ./public # Deployment job deploy: environment: name: github-pages url: ${{ steps.deployment.outputs.page_url }} runs-on: ubuntu-latest needs: build steps: - name: Deploy to GitHub Pages id: deployment uses: actions/deploy-pages@v4 Add .github directory and the file in it into the local repository. Run following command to push the new changes to the remote repository: git add .github\ngit commit -m’add github action file’ .github\ngit push -u origin main now go to the github site. we should see a action named: Deploy Hugo site to Pages running. after it finish and successful. point your browser to https://bizhong62.github.io/ now the site is deployed to git hub.",
    "description": "Install Hugo on Raspberry Pi: 1. sudo apt update 2. sudo apt install snapd Create First Hugo Site: Create a new site with following command:\nhugo new site Hugosite Make the newly created Hugosite your current working directory:\ncd Hugosite Create a git repository at the Hugosite root directory:\ngit init Create a hugo theme using submodule command:\ngit submodule add https://github.com/McShelby/hugo-theme-relearn.git themes/hugo-theme-relearn Add the following line at the end of hugo.toml file:\ntheme = ‘hugo-theme-relearn’ Add one page into the new site:\nhugo new content Notes/Learning-Hugo.md\nthen add some content into the content/NotesLearning-Hugo.md file. Test the newly created site:\nhugo server -D Initial result:\npoint your browser at http://localhost:1313, the new page should show up. Deploy Hugosite to the github site: Change the baseURL in hugo.toml file as following\nbaseURL = ‘https://bizhong62.github.io/' remove draft = true line from hugo.toml file. Create a github account. Create a new github public remote repository named username.github.io. Now select the newly created remote repository bizhong62.github.io. in the setting of this particular repository, in left hand side panel, select code and automation-\u003epage, there is a Build and deployment source pull down button: select Git Actions. Create Hugosite/.github/workflows/hugo.yaml, this file will contain the action used by github to generate HTML. copy and paste following into the file. name: Deploy Hugo site to Pages on: # Runs on pushes targeting the default branch push: branches: - main # Allows you to run this workflow manually from the Actions tab workflow_dispatch: # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages permissions: contents: read pages: write id-token: write # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued. # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete. concurrency: group: \"pages\" cancel-in-progress: false # Default to bash defaults: run: shell: bash jobs: # Build job build: runs-on: ubuntu-latest env: HUGO_VERSION: 0.141.0 hugo_extended_ : true steps: - name: Install Hugo CLI run: | wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \\ \u0026\u0026 sudo dpkg -i ${{ runner.temp }}/hugo.deb - name: Install Dart Sass run: sudo snap install dart-sass - name: Checkout uses: actions/checkout@v4 with: submodules: recursive fetch-depth: 0 - name: Setup Pages id: pages uses: actions/configure-pages@v4 - name: Install Node.js dependencies run: \"[[ -f package-lock.json || -f npm-shrinkwrap.json ]] \u0026\u0026 npm ci || true\" - name: Build with Hugo env: # For maximum backward compatibility with Hugo modules HUGO_ENVIRONMENT: production HUGO_ENV: production run: | hugo \\ --gc \\ --minify \\ --baseURL \"${{ steps.pages.outputs.base_url }}/\" - name: Upload artifact uses: actions/upload-pages-artifact@v4 with: path: ./public # Deployment job deploy: environment: name: github-pages url: ${{ steps.deployment.outputs.page_url }} runs-on: ubuntu-latest needs: build steps: - name: Deploy to GitHub Pages id: deployment uses: actions/deploy-pages@v4 Add .github directory and the file in it into the local repository. Run following command to push the new changes to the remote repository: git add .github\ngit commit -m’add github action file’ .github\ngit push -u origin main now go to the github site. we should see a action named: Deploy Hugo site to Pages running. after it finish and successful. point your browser to https://bizhong62.github.io/ now the site is deployed to git hub.",
    "tags": [],
    "title": "Learning Hugo",
    "uri": "/notes/learning-hugo/index.html"
  },
  {
    "breadcrumb": "Path to my memory",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Notes",
    "uri": "/notes/index.html"
  },
  {
    "breadcrumb": "",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Path to my memory",
    "uri": "/index.html"
  },
  {
    "breadcrumb": "Path to my memory",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/categories/index.html"
  },
  {
    "breadcrumb": "Path to my memory",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/tags/index.html"
  }
]
