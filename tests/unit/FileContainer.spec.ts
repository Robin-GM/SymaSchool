import { shallowMount } from '@vue/test-utils';
import fileContainer from '@/app/components/Cloud/FileContainer.vue';
import { mdiFolder, mdiFilePdfBox, mdiFile, } from '@mdi/js';

let wrapper: any = null;

const file = {
        name: "Document.pdf",
        size: 2222222,
        type: "pdf",
        path: "robin/doc"
    }

beforeEach(() => {
    wrapper = shallowMount(fileContainer, {
        propsData: {
            file
        }
    });
});

afterEach(() => {
    wrapper.destroy();
});


describe("fileContainer", () => {
    it('renders file name', () => {
        expect(wrapper.find(".name").text()).toBe("Document.pdf");
    })

    it("renders file size ", () => {
        expect(wrapper.find(".size").text()).toBe("2.222222 MB");
    })

    it("renders the right icon", () => {
        expect(wrapper.find(".icone").text()).toBe(mdiFilePdfBox);
    })
});

