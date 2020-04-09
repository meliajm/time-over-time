class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks, include: [:category], methods: :get_date
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @category = Category.find_or_create_by(name: category_params[:name])
    # @task = Task.new(task_params)
    @task = @category.tasks.build(task_params)



    if @task.save
      render json: @task, include: [:category], status: :created, location: @task, methods: :get_date
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task, methods: :get_date
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end

    # Only allow a trusted parameter "white list" through.
    def task_params
      params.require(:task).permit(:content, :completed)
    end
end
