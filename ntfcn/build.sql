
INSERT INTO sy_list (_key, _tx, area, id, title) VALUES
    ('pb.which_user', null, 'pb', 'which_user', 'Which user'),
    ('pb.when', null, 'pb', 'when', 'When'),
    ('pb.how_often', null, 'pb', 'how_often', 'How often');


INSERT INTO sy_list_item (_key, _tx, seq_number, list, id, text, active, from_value, to_value) VALUES
    ('pb.which_user.U', null, '0', 'pb.which_user', 'U', 'named user', 'A', null, null),
    ('pb.which_user.T', null, '1', 'pb.which_user', 'T', 'user type', 'A', null, null),
    ('pb.which_user.R', null, '2', 'pb.which_user', 'R', 'user role', 'A', null, null),
    ('pb.when.L', null, '0', 'pb.when', 'L', 'on login', 'A', null, null),
    ('pb.when.P', null, '1', 'pb.when', 'P', 'on specific page', 'A', null, null),
    ('pb.how_often.O', null, '0', 'pb.how_often', 'O', 'only once', 'A', null, null),
    ('pb.how_often.P', null, '1', 'pb.how_often', 'P', 'until a given date', 'A', null, null),
    ('pb.how_often.A', null, '2', 'pb.how_often', 'A', 'until acknowledged', 'A', null, null);

