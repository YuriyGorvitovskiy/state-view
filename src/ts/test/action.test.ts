import * as Action from '../main/action';
import {Cache, Entity} from '../main/cache';
import {State} from '../main/state';
import {Path} from '../main/path';
import {Patch} from '../main/patch';

describe('Check Action class', () => {
    const cache = new Cache();
    const processor = new Action.Processor(cache);

    const create_new_story_after_link = "create_new_story_after_link";
    interface ParamA extends Action.Param {
        after: any;
        name: string;
    };
    processor.register<ParamA>({
        id: create_new_story_after_link,
        request: {
            after: {
                $id: null,
                action_id: new Path("action_id"),
                release_id: new Path("release_id"),
                release_ix: new Path("release_ix"),
                project_id: new Path("release_id.project_id")
            }
        },
        process: (param: ParamA, newIdFor) => {
            const story_id = newIdFor("story");
            const link_id = newIdFor("action_release_story");
            return {
                insert: [{
                    id: story_id,
                    name: param.name,
                    project_id: param.after.project_id
                },
                {
                    id: link_id,
                    action_id: param.after.action_id,
                    release_id: param.after.release_id,
                    release_ix: param.after.release_ix + 1,
                    story_id: story_id,
                }
            ]};
        }
    });
    const rename_story = "rename_story";
    interface ParamB extends Action.Param {
        id: any;
        name: string;
    };
    processor.register<ParamB>({
        id: rename_story,
        request: {},
        process: (param) => {
            return {update: [{id: param.id, name: param.name}]};
        }
    });

    const move_link = "move_link";
    interface ParamC extends Action.Param {
        from: any;
        after: any;
    };
    processor.register<ParamC>({
        id: move_link,
        request: {
            from: {
                $id: null,
                story_id: new Path("story_id")
            },
            after: {
                $id: null,
                action_id: new Path("action_id"),
                release_id: new Path("release_id"),
                release_ix: new Path("release_ix"),
                project_id: new Path("release_id.project_id")
            }
        },
        process: (param, newIdFor) => {
            const link_id = newIdFor("action_release_story");
            return {
                insert: [{
                    id: link_id,
                    action_id: param.after.action_id,
                    release_id: param.after.release_id,
                    release_ix: param.after.release_ix + 1,
                    story_id: param.from.story_id
                }],
                delete: [param.from.$id]
            };
        }
    });

    const remove_link = "remove_link";
    interface ParamD extends Action.Param {
        link: any;
    };

    processor.register<ParamD>({
        id: remove_link,
        request: {
            link: {
                $id: null,
                story_id: new Path("story_id")
            }
        },
        process: (parameters) => {
            return {delete: [parameters.link.$id, parameters.link.story_id]};
        }
    });

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
            storyboard_ix: 1
        });
        cache.set({
            id: action1_id,
            name: "Action1",
            activity_id: activity_id,
            activity_ix: 1
        });
        cache.set({
            id: action2_id,
            name: "Action2",
            activity_id: activity_id,
            activity_ix: 2
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
            release_ix: 1
        });
        cache.set({
            id: action2_release1_story2_id,
            action_id: action2_id,
            release_id: release1_id,
            story_id: story2_id,
            release_ix: 1
        });
    }

    it('function execute("create_new_entity") should work correctly', () => {
        // Setup
        const cache = new Cache();
        const id1 = "type:1";
        const id2 = "type:2";
        cache.set({id: id1, "^type:ref_id": []});

        interface Param extends Action.Param {
            id: string;
            ref_id: any;
            name: string;
        };
        const processor = new Action.Processor(cache);
        const action1_id = "create_new_entity";
        processor.register<Param>({
            id: action1_id,
            request: {
                ref_id: {$id: null}
            },
            process: (param) => {
                return {insert: [{id: param.id, ref_id: param.ref_id.$id, name: param.name}]};
            }
        });

        // Execute
        processor.execute<Param>({
            action_id: action1_id,
            param: {
                id: id2,
                ref_id: id1,
                name: "Hello World!"
            }
        });

        // Verify
        expect(cache.get(id1)).toEqual({id: id1, "^type:ref_id":[id2]});
        expect(cache.get(id2)).toEqual({id: id2, ref_id: id1, name: "Hello World!"});
    });

    it('function execute("create_new_story_after_link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        // Execute
        processor.execute<ParamA>({
            action_id: create_new_story_after_link,
            param: {
                after: action1_release1_story1_id,
                name: "New Story"
            }
        });

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

    it('function execute("rename_story") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        // Execute
        processor.execute<ParamB>({
            action_id: rename_story,
            param: {
                id: story1_id,
                name: "Story Renamed"
            }
        });

        // Verify
        expect(cache.get(story1_id)).toEqual({
            id: story1_id,
            name: "Story Renamed",
            project_id: project_id
        });
    });

    it('function execute("move_link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        // Execute
        processor.execute<ParamC>({
            action_id: move_link,
            param: {
                from: action1_release1_story1_id,
                after: action2_release1_story2_id
            }
        });

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

    it('function execute("remove_link") should work correctly', () => {
        // Setup
        cache.clear();
        cache.resetIdGenerator();

        createProjectHerarchy();

        // Execute
        processor.execute<ParamD>({
            action_id: remove_link,
            param: {
                link: action1_release1_story1_id,
            }
        });

        // Verify
        expect(cache.get(story1_id)).toBeUndefined();
        expect(cache.get(action1_release1_story1_id)).toBeUndefined();
    });
});
