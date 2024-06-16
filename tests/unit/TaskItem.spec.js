import { shallowMount } from "@vue/test-utils";
import TaskItem from "@/components/molecules/task-item/task-item.vue";
import { createStore } from "vuex";

describe("TaskItem.vue", () => {
  let wrapper;
  let store;
  let dispatchSpy;

  beforeEach(() => {
    store = createStore({
      actions: {
        updateTaskStatus: jest.fn(),
      },
      modules: {
        taskModule: {
          namespaced: true,
          actions: {
            updateTaskStatus: jest.fn(),
          },
        },
      },
    });

    dispatchSpy = jest.spyOn(store, "dispatch");

    wrapper = shallowMount(TaskItem, {
      global: {
        plugins: [store],
        stubs: {
          CustomSelect: true,
        },
      },
      props: {
        projectId: "123",
        id: "456",
        name: "Task Name",
        status: "to-do",
        description: "Task Description",
      },
    });
  });

  it("renders props correctly", () => {
    expect(wrapper.props("projectId")).toBe("123");
    expect(wrapper.props("id")).toBe("456");
    expect(wrapper.props("name")).toBe("Task Name");
    expect(wrapper.props("status")).toBe("to-do");
    expect(wrapper.props("description")).toBe("Task Description");
  });

  it("dispatches updateTaskStatus action when CustomSelect emits update:modelValue", async () => {
    const customSelect = wrapper.findComponent({ name: "CustomSelect" });
    expect(customSelect.exists()).toBe(true);

    await customSelect.vm.$emit("update:modelValue", "done");

    expect(dispatchSpy).toHaveBeenCalledWith(
      "taskModule/updateTaskStatus",
      {
        projectId: "123",
        taskId: "456",
        status: "done",
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
});
