import { mount } from '@vue/test-utils';
import TasksBoard from '@/components/organisms/tasks-board/tasks-board.vue';
import TaskItem from '@/components/molecules/task-item/task-item.vue';

describe('TasksBoard.vue', () => {
  let wrapper;

  const mockTasks = [
    {
      id: '1',
      name: 'Task 1',
      description: 'Task 1 description',
      status: 'to-do'
    },
    {
      id: '2',
      name: 'Task 2',
      description: 'Task 2 description',
      status: 'active'
    },
    {
      id: '3',
      name: 'Task 3',
      description: 'Task 3 description',
      status: 'done'
    }
  ];

  beforeEach(() => {
    wrapper = mount(TasksBoard, {
      props: {
        projectId: 'test-project-id',
        tasks: mockTasks
      },
      components: {
        TaskItem
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the tasks board', () => {
    expect(wrapper.find('.tasks-board').exists()).toBe(true);
  });

  it('renders the correct number of task items', () => {
    const todoTaskItems = wrapper.findAll('li').filter(li => {
      const taskItem = li.findComponent(TaskItem);
      return taskItem.exists() && taskItem.props().status === 'to-do';
    });

    const inProgressTaskItems = wrapper.findAll('li').filter(li => {
      const taskItem = li.findComponent(TaskItem);
      return taskItem.exists() && taskItem.props().status === 'active';
    });

    const doneTaskItems = wrapper.findAll('li').filter(li => {
      const taskItem = li.findComponent(TaskItem);
      return taskItem.exists() && taskItem.props().status === 'done';
    });

    expect(todoTaskItems.length).toBe(1);
    expect(inProgressTaskItems.length).toBe(1);
    expect(doneTaskItems.length).toBe(1);
  });

  it('renders the correct task item props', () => {
    const todoTaskItem = wrapper.findAll('li').filter(li => li.text().includes('Task 1')).at(0);
    const inProgressTaskItem = wrapper.findAll('li').filter(li => li.text().includes('Task 2')).at(0);
    const doneTaskItem = wrapper.findAll('li').filter(li => li.text().includes('Task 3')).at(0);

    expect(todoTaskItem.findComponent(TaskItem).props()).toEqual({
      projectId: 'test-project-id',
      id: '1',
      name: 'Task 1',
      description: 'Task 1 description',
      status: 'to-do'
    });

    expect(inProgressTaskItem.findComponent(TaskItem).props()).toEqual({
      projectId: 'test-project-id',
      id: '2',
      name: 'Task 2',
      description: 'Task 2 description',
      status: 'active'
    });

    expect(doneTaskItem.findComponent(TaskItem).props()).toEqual({
      projectId: 'test-project-id',
      id: '3',
      name: 'Task 3',
      description: 'Task 3 description',
      status: 'done'
    });
  });

  it('renders "No tasks" message when there are no tasks', () => {
    const wrapper = mount(TasksBoard, {
      props: {
        projectId: 'test-project-id',
        tasks: []
      },
      components: {
        TaskItem
      }
    });

    expect(wrapper.find('li > h3').text()).toBe('Nenhuma task para fazer');
    expect(wrapper.findAll('li > h3').length).toBe(3);
  });
});