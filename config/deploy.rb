# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'worldcapp'
set :repo_url, 'git@github.com:lauenroth/WorldcAPP.git'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

after :deploy, :clear_cache do
	on roles(:web) do
		within release_path do

      info 'Install meteor'
      execute 'cd ' + current_path.to_s + '/app && meteor update --release 1.3.2.4'
      execute 'cd ' + current_path.to_s + '/app && npm install'
      execute 'cd ' + current_path.to_s + '/app && npm prune --production'

      info 'Create build'
      execute 'cd ' + current_path.to_s + '/app && meteor build --directory ../'

      info 'install dependencies'
      execute 'cd ' + current_path.to_s + '/bundle/programs/server && npm install'

      #execute 'rm -rf ' + current_path.to_s + '/bundle/programs/server/npm/npm-bcrypt/node_modules/bcrypt'
      #execute 'cd ' + current_path.to_s + '/bundle/programs/server && npm install bcrypt'
      #execute 'cp -r ' + current_path.to_s + '/bundle/programs/server/node_modules/bcrypt ' + current_path.to_s + '/bundle/programs/server/npm/node_modules/'

      info 'Clean up'
      execute 'rm -rf ' + current_path.to_s + '/app'
      execute 'rm -rf ' + current_path.to_s + '/build'
      execute 'rm -rf ' + current_path.to_s + '/config'

      info 'Restart app'
      execute "restart worldcapp"

    end
  end
end
