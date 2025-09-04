import { mount, type VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";

describe.skip("LoadingSpinner Component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(LoadingSpinner, {
      props: {
        size: "small",
        text: "テスト",
        containerClass: "test",
      },
      global: {
        mocks: {
          $t: (msg: string) => msg,
        },
      },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("propsのサイズが正しく反映される", () => {
    expect(wrapper.props().size).toBe("small");
  });
});
