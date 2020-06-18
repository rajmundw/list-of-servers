import * as selector from './servers.selectors';
import {mockServers, mockStore, mockStoreWithoutMessage} from "../mock-serverrs-test/mock-servers";

describe('Servers selectors', () => {
    it('should return error message', () => {
        expect(selector.errorSelector.projector(mockStore)).toBe('errorMessage');
    });

    it('should no error message, message redirects to devtools', () => {
        expect(selector.errorSelector.projector(mockStoreWithoutMessage)).toBe('message');
    });

    it('should return array of servers', () => {
        expect(selector.serversSelector.projector(mockStore)).toBe(mockServers);
    });
});
