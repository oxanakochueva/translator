class PersonalWorkspacesController < ApplicationController
  before_action :set_personal_workspace, only: [:show, :edit, :update, :destroy]

  # GET /personal_workspaces
  # GET /personal_workspaces.json
  def index
    @personal_workspaces = PersonalWorkspace.all
  end

  # GET /personal_workspaces/1
  # GET /personal_workspaces/1.json
  def show
  end

  # GET /personal_workspaces/new
  def new
    @personal_workspace = PersonalWorkspace.new
  end

  # GET /personal_workspaces/1/edit
  def edit
  end

  # POST /personal_workspaces
  # POST /personal_workspaces.json
  def create
    @personal_workspace = PersonalWorkspace.new(personal_workspace_params)

    respond_to do |format|
      if @personal_workspace.save
        format.html { redirect_to @personal_workspace, notice: 'Personal workspace was successfully created.' }
        format.json { render :show, status: :created, location: @personal_workspace }
      else
        format.html { render :new }
        format.json { render json: @personal_workspace.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /personal_workspaces/1
  # PATCH/PUT /personal_workspaces/1.json
  def update
    respond_to do |format|
      if @personal_workspace.update(personal_workspace_params)
        format.html { redirect_to @personal_workspace, notice: 'Personal workspace was successfully updated.' }
        format.json { render :show, status: :ok, location: @personal_workspace }
      else
        format.html { render :edit }
        format.json { render json: @personal_workspace.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /personal_workspaces/1
  # DELETE /personal_workspaces/1.json
  def destroy
    @personal_workspace.destroy
    respond_to do |format|
      format.html { redirect_to personal_workspaces_url, notice: 'Personal workspace was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_personal_workspace
      @personal_workspace = PersonalWorkspace.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def personal_workspace_params
      params.require(:personal_workspace).permit(:user_id)
    end
end
