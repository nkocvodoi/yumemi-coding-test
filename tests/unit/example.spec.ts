import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import PopulationChart from "@/components/PopulationChart.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(PopulationChart, {
      props: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
