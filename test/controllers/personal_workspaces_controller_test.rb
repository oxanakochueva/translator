require 'test_helper'

class PersonalWorkspacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @personal_workspace = personal_workspaces(:one)
  end

  test "should get index" do
    get personal_workspaces_url
    assert_response :success
  end

  test "should get new" do
    get new_personal_workspace_url
    assert_response :success
  end

  test "should create personal_workspace" do
    assert_difference('PersonalWorkspace.count') do
      post personal_workspaces_url, params: { personal_workspace: { user_id: @personal_workspace.user_id } }
    end

    assert_redirected_to personal_workspace_url(PersonalWorkspace.last)
  end

  test "should show personal_workspace" do
    get personal_workspace_url(@personal_workspace)
    assert_response :success
  end

  test "should get edit" do
    get edit_personal_workspace_url(@personal_workspace)
    assert_response :success
  end

  test "should update personal_workspace" do
    patch personal_workspace_url(@personal_workspace), params: { personal_workspace: { user_id: @personal_workspace.user_id } }
    assert_redirected_to personal_workspace_url(@personal_workspace)
  end

  test "should destroy personal_workspace" do
    assert_difference('PersonalWorkspace.count', -1) do
      delete personal_workspace_url(@personal_workspace)
    end

    assert_redirected_to personal_workspaces_url
  end
end
