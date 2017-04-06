
INSERT INTO sy_list (_key, _tx, area, id, title) VALUES
    ('pb.security', null, 'pb', 'security', 'Article Security');


INSERT INTO sy_list_item (_key, _tx, seq_number, list, id, text, active, from_value, to_value) VALUES
    ('pb.security.GA', null, '0', 'pb.security', 'GA', 'guest access (read-only)', 'A', null, null),
    ('pb.security.UA', null, '0', 'pb.security', 'UA', 'user access (read-only)', 'A', null, null);


INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_admin'     , 'help_admin'     , 'Admin Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_intranet'  , 'help_intranet'  , 'Candidate Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_extranet'  , 'help_extranet'  , 'Candidate Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_asw'       , 'help_asw'       , 'Agency-Supplied Worker Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_guest'     , 'help_guest'     , 'Guest Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_hiring_mgr', 'help_hiring_mgr', 'Hiring Manager Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_other'     , 'help_other'     , 'Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_supplier'  , 'help_supplier'  , 'Supplier User Help' );
INSERT INTO pb_article ( _key, id, title ) VALUES ( 'help_cand_ivw'  , 'help_cand_ivw'  , 'Candidate Interview Help' );
