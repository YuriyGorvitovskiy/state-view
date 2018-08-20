import * as Action from '../../main/state-machine/action';
import * as Cache from '../../main/state-machine/cache';
import * as Patch from '../../main/state-machine/patch';
import * as Request from '../../main/state-machine/request';
import * as Widget from '../../main/state-machine/widget';

import * as CreateNewEntity from './action/create-new-entity';
import * as CreateNewStoryAfterLink from './action/create-new-story-after-link';
import * as MoveLink from './action/move-link';
import * as RemoveLink from './action/remove-link';
import * as RenameStory from './action/rename-story';

describe('Check Action class', () => {
    Widget.registerRootComponent({refresh: () => {}});
    const cache = Cache.CACHE;

    Action.REGISTRY[CreateNewEntity.ACTION] = CreateNewEntity.execute;
    Action.REGISTRY[CreateNewStoryAfterLink.ACTION] = CreateNewStoryAfterLink.execute;
    Action.REGISTRY[MoveLink.ACTION] = MoveLink.execute;
    Action.REGISTRY[RemoveLink.ACTION] = RemoveLink.execute;
    Action.REGISTRY[RenameStory.ACTION] = RenameStory.execute;

    const project_id = "project:1";
    const storyboard_id = "storyboard:1";
    const release1_id = "release:1";
    const activity_id = "activity:1";
    const action1_id = "action:1";
    const action2_id = "action:2";
    const story1_id = "story:1";
    const story2_id = "story:2";
    const action1_release1_story1_id = "action_release_story:1:1:1";
    const action2_release1_story2_id = "action_release_story:2:1:2";

    const createProjectHerarchy = () => {
        cache.set({
            id: project_id,
            name: "Project"
        });
        cache.set({
            id: release1_id,
            name: "Release",
            project_id: project_id,
            project_ix: 1,
            "^action_release_story:release_id": [action1_release1_story1_id, action2_release1_story2_id]
        });
        cache.set({
            id: storyboard_id,
            name: "Storyboard",
            project_id: project_id
        });
        cache.set({
            id: activity_id,
            name: "Activity",
            storyboard_id: storyboard_id,
            storyboard_ix: 1,
        });
        cache.set({
            id: action1_id,
            name: "Action1",
            activity_id: activity_id,
            activity_ix: 1,
        });
        cache.set({
            id: action2_id,
            name: "Action2",
            activity_id: activity_id,
            activity_ix: 2,
        });
        cache.set({
            id: story1_id,
            name: "Story",
            project_id: project_id
        });
        cache.set({
            id: story2_id,
            name: "Story",
            project_id: project_id
        });
        cache.set({
            id: action1_release1_story1_id,
            action_id: action1_id,
            release_id: release1_id,
            story_id: story1_id,
            release_ix: 1,
        });
        cache.set({
            id: action2_release1_story2_id,
            action_id: action2_id,
            release_id: release1_id,
            story_id: story2_id,
            release_ix: 1,
        });
    }

    it('function execute("create_new_entity") should work correctly', () => {
        // Setup
        cache.clear();

        const id1 = "type:1";
        const id2 = "type:2";
        cache.set({id: id1, "^type:ref_id": []});

        const request = CreateNewEntity.request({
            id: id2,
            name: "Hello World!",
            ref_id: id1,
        });

        // Execute
        const action = cache.evaluateState(null, request);
        Action.fire(action.$action, action.$params);

        // Verify
        expect(cache.get(id1)).toEqual({id: id1, "^type:ref_id":[id2]});
        expect(cache.get(id2)).toEqual({id: id2, ref_id: id1, name: "Hello World!"});
    });

    it('function execute("create-new-story-after-link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        const request = CreateNewStoryAfterLink.request({
            name: "New Story",
            from: {
                $id: null,
            },
            after: {
                $id: action1_release1_story1_id,
                action_id: Request.path("action_id"),
                release_id: Request.path("release_id"),
                release_ix: Request.path("release_ix"),
                project_id: Request.path("release_id.project_id")
            }
        });

        // Execute
        const action = cache.evaluateState(null, request);
        Action.fire(action.$action, action.$params);

        // Verify
        expect(cache.get("story:~1")).toEqual({
            id: "story:~1",
            name: "New Story",
            project_id: project_id
        });

        expect(cache.get("action_release_story:~2")).toEqual({
            id: "action_release_story:~2",
            action_id: "action:1",
            release_id: "release:1",
            release_ix: 2,
            story_id: "story:~1"
        });
    });

    it('function execute("rename-story") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        const request = RenameStory.request({
            id: story1_id,
            name: "Story Renamed",
        });

        // Execute
        const action = cache.evaluateState(null, request);
        Action.fire(action.$action, action.$params);

        // Verify
        expect(cache.get(story1_id)).toEqual({
            id: story1_id,
            name: "Story Renamed",
            project_id: project_id
        });
    });

    it('function execute("move-link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        const request = MoveLink.request({
            name: "New Story",
            from: {
                $id: action1_release1_story1_id,
                story_id: Request.path("story_id")
            },
            after: {
                $id: action2_release1_story2_id,
                action_id: Request.path("action_id"),
                release_id: Request.path("release_id"),
                release_ix: Request.path("release_ix")
            }
        });

        // Execute
        const action = cache.evaluateState(null, request);
        Action.fire(action.$action, action.$params);

        // Verify
        expect(cache.get(action1_release1_story1_id)).toBeUndefined();
        expect(cache.get(action2_release1_story2_id)).toBeDefined();
        expect(cache.get("action_release_story:~1")).toEqual({
            id: "action_release_story:~1",
            action_id: "action:2",
            release_id: "release:1",
            release_ix: 2,
            story_id: "story:1"
        });
        expect(cache.get(story1_id)).toBeDefined();
        expect(cache.get(release1_id)["^action_release_story:release_id"]).toEqual([action2_release1_story2_id, "action_release_story:~1"]);
    });

    it('function execute("remove-link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        const request = RemoveLink.request({
            $id: action1_release1_story1_id,
            story_id: Request.path("story_id")
        });

        // Execute
        const action = cache.evaluateState(null, request);
        Action.fire(action.$action, action.$params);

        // Verify
        expect(cache.get(story1_id)).toBeUndefined();
        expect(cache.get(action1_release1_story1_id)).toBeUndefined();
    });
});
